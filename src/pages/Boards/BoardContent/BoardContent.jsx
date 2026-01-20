import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sort'
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '../../../customLibs/dndKitSensors'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCard/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholder } from '../../../utils/formatter'

const ACTIVE_DRAG_ITEM_STYLE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_STYLE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_STYLE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard, moveColumns }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  //cùng 1 thời điểm chỉ có 1 phần tử card hoặc column được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)
  // điểm va chạm cuois cùng
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      //clone mảng oderedcolumnstate cũ  ra 1 cái mới  để xử lý dữ liệu rồi return cập nhật lại orderedcolumnstate mới
      const nextCloumns = cloneDeep(prevColumns)
      const nextActiveCloumn = nextCloumns.find(
        (column) => column._id === activeColumn._id
      )
      const nextOverCloumn = nextCloumns.find(
        (column) => column._id === overColumn._id
      )
      //có thể hiểu khi di chuyển card từ column 1 sang column 2 thì column 1 là active column còn column 2 là over column
      if (nextActiveCloumn) {
        //xóa card ở active column
        nextActiveCloumn.cards = nextActiveCloumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        if (isEmpty(nextActiveCloumn.cards)) {
          nextActiveCloumn.cards = [generatePlaceholder(nextActiveCloumn)]
        }

        //cập nhật lại mảng cho active column
        nextActiveCloumn.cardOrderIds = nextActiveCloumn.cards.map(
          (card) => card._id
        )
      }
      if (nextOverCloumn) {
        //kiểm tra card ddang kéo có tồn tại over column chưa
        nextOverCloumn.cards = nextOverCloumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        //thêm card vào over column
        nextOverCloumn.cards = nextOverCloumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverCloumn._id
        })

        //xóa placeholder card khi thêm 1 card bth vào column rỗng
        nextOverCloumn.cards = nextOverCloumn.cards.filter(
          (c) => !c.FE_PlaceholderCard
        )

        //cập nhật lại dữ liệu cho over column
        nextOverCloumn.cardOrderIds = nextOverCloumn.cards.map(
          (card) => card._id
        )
      }
      return nextCloumns
    })
  }

  const handleDragStart = (event) => {
    // console.log('handle drag start', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_STYLE.CARD
        : ACTIVE_DRAG_ITEM_STYLE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    )
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) return
    // console.log('handle drag over: ', event)
    const { active, over } = event
    if (!over || !active) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    if (!over || !active) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // console.log('hanh dong keo tha card trong 1 column')
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        )

        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        )

        const dndOrderedCard = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumns((prevColumns) => {
          const nextCloumns = cloneDeep(prevColumns)
          const targetColumn = nextCloumns.find((c) => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCard
          targetColumn.cardOrderIds = dndOrderedCard.map((c) => c._id)
          return nextCloumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const newIndex = orderedColumns.findIndex((c) => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
        // console.log('keo tha')
        moveColumns(dndOrderedColumns)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  //args là arguments, tham số hoặc đối số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) {
        return closestCorners({ ...args })
      }
      //tìm các điểm giao nhau vs con trỏ
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections) return
      // eslint-disable-next-line no-extra-boolean-cast
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args)
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((c) => c._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((c) => {
              return (
                c.id !== overId && checkColumn?.cardOrderIds?.includes(c.id)
              )
            })
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemData && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
