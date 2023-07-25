import { useEffect, useState } from 'react';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';
import axiosClient from 'helper';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = ({handleFilterByCategory,selectedValue,handleSubmitFilter}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [allCategories,setAllCategories]=useState([])

  const handleFilter = () => {};
  useEffect(()=>{
    axiosClient()
    .get(`/category/getAll`)
    .then((res) => {
      setAllCategories(res.data.data)
      // dispatch(getAllProductsSuccess(res?.data?.data));
    })
    .catch((err) => {
      return err?.response?.data;
    });
  },[])
console.log("allCategories @@",allCategories)
  return (
    <form className="products-filter" onChange={handleFilter}>
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? 'products-filter__menu-btn--active' : ''
        }`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>
      <div
        className={`products-filter__wrapper ${
          filtersOpen ? 'products-filter__wrapper--open' : ''
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {allCategories.map((item)=>(
  <Checkbox checked={item.name===selectedValue?true:false} name="product-type"  label={item.name} onChange={()=>handleFilterByCategory(item.name)} />
            ))}
            
          
            {/* <Checkbox name="product-type" label="Pents" />
            <Checkbox name="product-type" label="Shoes" /> */}
          </div>
        </div>
        {/* <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={0}
              max={20}
              defaultValue={[3, 10]}
              tipFormatter={(value) => `${value}%`}
            />
          </div>
        </div> */}
        {/* <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            <Checkbox type="square" name="product-size" label="XS" />
            <Checkbox type="square" name="product-size" label="S" />
            <Checkbox type="square" name="product-size" label="M" />
            <Checkbox type="square" name="product-size" label="L" />
            <Checkbox type="square" name="product-size" label="XL" />
            <Checkbox type="square" name="product-size" label="XXL" />
          </div>
        </div> */}
        {/* <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              <CheckboxColor valueName="1" name="product-color" color="black" />
              <CheckboxColor valueName="1" name="product-color" color="brown" />
              <CheckboxColor valueName="1" name="product-color" color="wheat" />
              <CheckboxColor valueName="1" name="product-color" color="gray" />
              <CheckboxColor
                valueName="1"
                name="product-color"
                color="lightgray"
              />
              <CheckboxColor valueName="1" name="product-color" color="blue" />
            </div>
          </div>
        </div> */}
        <button onClick={handleSubmitFilter} type="submit" className="btn btn--rounded btn--yellow">
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
