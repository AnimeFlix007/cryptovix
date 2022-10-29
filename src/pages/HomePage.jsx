import React from 'react'
import BannerCrypto from '../components/home/BannerCrypto'
import CoinsTable from '../components/coins/CoinsTable'

const HomePage = () => {
  return (
    <React.Fragment>
      <BannerCrypto />
      <CoinsTable />
    </React.Fragment>
  )
}

export default HomePage