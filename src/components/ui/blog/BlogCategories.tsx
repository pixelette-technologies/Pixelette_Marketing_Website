import { Heading, Text } from "@/components/feature";
import { IoSearchOutline } from "react-icons/io5";

const BlogCategories = () => {
  return (
    <>
      <div className='blogCategories bg_white'>
        <Heading className='tertiary font_family_glory'>Categories</Heading>
        <div>
          <IoSearchOutline />
          <input type='text' placeholder='Search' />
        </div>

        <section>
          <div>
            <Text className='tertiary'>All</Text>
          </div>
          <div>
            <Text className='tertiary'>B2B Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Branding</Text>
          </div>
          <div>
            <Text className='tertiary'>Community Management</Text>
          </div>
          <div>
            <Text className='tertiary'>Crypto Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>DeFi Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Design</Text>
          </div>
          <div>
            <Text className='tertiary'>Digital Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Ecommerce Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Email Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Fintech Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>ICO Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>IDO Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Influencer Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>Lead Generation</Text>
          </div>
          <div>
            <Text className='tertiary'>NFT Marketing</Text>
          </div>
          <div>
            <Text className='tertiary'>PPC</Text>
          </div>
          <div>
            <Text className='tertiary'>PR</Text>
          </div>
          <div>
            <Text className='tertiary'>SaaS Marketing</Text>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogCategories;
