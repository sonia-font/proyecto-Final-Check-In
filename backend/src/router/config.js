import dotenv from 'dotenv'
dotenv.config()

function getFiwareCNX() {
  return process.env.FIWARE_CNX_STR
}

export { getFiwareCNX }