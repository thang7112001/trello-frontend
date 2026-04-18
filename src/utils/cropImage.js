// Hàm hỗ trợ tạo thẻ img để load ảnh từ URL
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

// Hàm chính để cắt ảnh dựa trên pixelCrop lấy từ thư viện react-easy-crop
export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  // Đặt kích thước canvas bằng đúng kích thước vùng crop
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Vẽ phần ảnh được crop lên canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Chuyển Canvas thành Blob (File) để gửi lên API
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        resolve(blob)
      },
      'image/jpeg',
      1
    ) // Định dạng JPEG, chất lượng 100%
  })
}
