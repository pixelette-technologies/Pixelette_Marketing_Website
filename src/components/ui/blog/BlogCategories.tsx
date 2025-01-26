import { Heading, Text } from "@/components/feature";
import { IoSearchOutline } from "react-icons/io5";

const BlogCategories = () => {
  return (
    <>
      <div
        className='blogCategories bg_white'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <Heading
          className='tertiary font_family_glory'
          animation='fade-up'
          duration='1200'
        >
          Categories
        </Heading>
        <div>
          <IoSearchOutline />
          <input type='text' placeholder='Search' />
        </div>

        <section>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>All</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>B2B Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Branding</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Community Management</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Crypto Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>DeFi Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Design</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Digital Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Ecommerce Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Email Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Fintech Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>ICO Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>IDO Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Influencer Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>Lead Generation</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>NFT Marketing</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>PPC</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>PR</Text>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'>
            <Text className='tertiary'>SaaS Marketing</Text>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogCategories;
