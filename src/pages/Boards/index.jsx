import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '../../components/AppBar/AppBar'
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner'
import CreateBoardModal from './create'
import { fetchBoardAPI } from '../../apis'
import { DEFAULT_ITEM_PER_PAGE, DEFAULT_PAGE } from '../../utils/constants'

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation()
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
     hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get('page') || '1', 10)

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    // Gọi API lấy danh sách boards ở đây...
    fetchBoardAPI(location.search).then(updateStateData)
  }, [location.search]) // Thêm page vào dependency để mỗi khi page thay đổi thì gọi lại API

  const afterCreateNewBoard = () => {
    //fetch lai danh sachs board
    fetchBoardAPI(location.search).then(updateStateData)
  }

  if (!boards) {
    return <PageLoadingSpinner caption='loading boards...' />
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: 2 }}>
        {/* Khu vực Sidebar bên trái */}
        <Box
          sx={{ width: '250px', p: 2, display: { xs: 'none', sm: 'block' } }}
        >
          <List sx={{ pt: 0 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton selected sx={{ borderRadius: 1 }}>
                <ListItemIcon>
                  <SpaceDashboardIcon color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary='Boards'
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ borderRadius: 1 }}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary='Templates' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ borderRadius: 1 }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <List sx={{ pt: 0 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setIsOpenCreateModal(true)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary='Create a new board' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Khu vực Nội dung chính (Danh sách Boards) */}
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          <Typography variant='h4' fontWeight='bold' sx={{ mb: 3 }}>
            Your boards:
          </Typography>

          {/* Render mảng giả lập 16 phần tử */}
          {boards === null ? (
            <Typography>Loading...</Typography>
          ) : boards.length === 0 ? (
            <Typography variant='body1' color='text.secondary'>
              You do not have any boards yet. Click Create a new board to get
              started!
            </Typography>
          ) : (
            <Box>
              <Grid container spacing={3}>
                {boards.map((b) => (
                  <Grid key={b._id}>
                    <Card
                      sx={{
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                        transition: '0.2s',
                        '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }
                      }}
                    >
                      <Box
                        sx={{ height: '100px', backgroundColor: '#1976d2' }}
                      />

                      <CardContent sx={{ pb: 1 }}>
                        <Typography variant='h6' fontWeight='bold' gutterBottom>
                          {b.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          noWrap
                        >
                          {b?.description}
                        </Typography>
                      </CardContent>

                      <CardActions
                        sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}
                      >
                        <Link
                          to={`/boards/${b._id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#1976d2',
                            fontWeight: 500
                          }}
                        >
                          Go to board
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Phân trang (Pagination) */}
              {totalBoards > 0 && (
                <Box
                  sx={{
                    my: 3,
                    pr: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Pagination
                    size='large'
                    color='secondary'
                    showFirstButton
                    showLastButton
                    // Giá trị page hiện tại lấy từ URL
                    page={page}
                    count={Math.ceil(totalBoards / DEFAULT_ITEM_PER_PAGE)}
                    // Sử dụng renderItem để custom thẻ bọc của từng số trang thành thẻ Link
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                        {...item}
                      />
                    )}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <CreateBoardModal
        isOpen={isOpenCreateModal}
        handleClose={() => setIsOpenCreateModal(false)}
        afterCreateNewBoard={afterCreateNewBoard}
      />
    </Box>
  )
}

export default Boards
