import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import ListCard from './ListCard/ListCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, createNewCard, deleteColumnDetails }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    //chiều cao luôn phải max 100%, vì nếu ko khi kéo column ngắn qua 1 cái column dài thì phải kéo ở giữa mới kéo được column
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCard = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  // const [searchValue, setSearchValue] = useState(null)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('please enter card title', { position: 'bottom-right' })
      return
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    createNewCard(newCardData)
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  //xử lý xóa 1 column và card bên trong nó
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = async () => {
    const { confirmed } = await confirmDeleteColumn({
      title: 'Delete Column?',
      description:
        'This action will permanently delete your Column and its cards! Are you sure?',
      confirmationText: 'confirm',
      cancellationText: 'cancel'
    })
    if (confirmed) {
      deleteColumnDetails(column._id)
    }
  }

  return (
    //phải bọc div ở đây vì vấn đề chiều cao của column sẽ gây ra bug
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          maxWidth: '300px',
          minWidth: '300px',
          ml: 2,
          borderRadius: '6px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          color: 'black',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight}-${theme.spacing(5)})`
        }}
      >
        {/* collumn header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Item'>
              <ExpandMoreIcon
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'palete.primary', cursor: 'pointer' }}
              />
            </Tooltip>
            <Menu
              id='basic-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-column-dropdown'
                }
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'success.main',
                    '& .add-card-icon': { color: 'success.main' }
                  }
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon
                    className='delete-forever-icon'
                    fontSize='small'
                  />
                </ListItemIcon>
                <ListItemText>remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* column list card */}
        <ListCard cards={orderedCard} />
        {/* column footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                sx={{ color: 'black' }}
                startIcon={<AddCardIcon />}
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                gap: 1,
                alignItems: 'center'
              }}
            >
              <TextField
                sx={{
                  '& label': { color: 'black' },
                  '& input': { color: 'black' },
                  '& label.Mui-focused': { color: 'black' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'primary.main' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '& .Mui-focused fieldset': { borderColor: 'red' }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 0,
                    borderColor: 'primary.main'
                  }
                }}
                label='Enter card title'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant='contained'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    color: 'success.contrastText',
                    bgcolor: 'success.light'
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: 'warning.contrastText',
                    cursor: 'pointer',
                    '&:hover': { color: 'warning.main' }
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
