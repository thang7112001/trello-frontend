import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../utils/cropImage.JS'

function CardCoverCropModal({ isOpen, imageSrc, onClose, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isCropping, setIsCropping] = useState(false)

  // Bắt sự kiện mỗi khi người dùng kéo thả/zoom xong
  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  // Xử lý khi bấm nút "Apply"
  const handleApplyCrop = async () => {
    try {
      setIsCropping(true)
      // Gọi hàm cắt ảnh từ file util
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)

      // Trả file đã crop về cho ActiveCard để gọi API
      onCropComplete(croppedImageBlob)
    } catch (e) {
      console.error(e)
    } finally {
      setIsCropping(false)
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose} disableScrollLock>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxWidth: '90vw',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant='h6' fontWeight='bold'>
          Adjust Cover Image
        </Typography>

        {/* Khu vực chứa giao diện Cropper */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 350,
            bgcolor: '#333',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            // Tỷ lệ khung hình của ảnh bìa (Chiều rộng thẻ ActiveCard khoảng 900, cao 320 -> Tỷ lệ ~ 2.8/1)
            aspect={900 / 320}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </Box>

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}
        >
          <Button
            variant='outlined'
            color='inherit'
            onClick={onClose}
            disabled={isCropping}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleApplyCrop}
            disabled={isCropping}
          >
            {isCropping ? 'Cropping...' : 'Apply & Upload'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CardCoverCropModal
