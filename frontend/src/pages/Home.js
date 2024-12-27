import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"vegetables"} heading={"Fresh Vegetables"}/>
      <HorizontalCardProduct category={"fruits"} heading={"Fruits"}/>

      <VerticalCardProduct category={"rice"} heading={"Rice"}/>
      <VerticalCardProduct category={"pulses"} heading={"Pulses"}/>
      <VerticalCardProduct category={"dairy"} heading={"Dairy and Eggs"}/>
      <VerticalCardProduct category={"flowers"} heading={"Flowers"}/>
    </div>
  )
}

export default Home