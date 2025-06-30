import React from 'react';
import styles from './Sorting.module.scss';
import { useDispatch,useSelector} from 'react-redux';
import { setSortBy } from '../store/slices/sortingSlice';   



function Sorting() {

    const dispatch = useDispatch();
    const sortBy=useSelector(state=>state.sorting.sortBy)


    const handleSortChange = (value) => {
        dispatch(setSortBy(value));
      };


    return(
<div className={styles['sorting']}>
<label className={styles['sorting__label']}>
<input className={styles['sorting__input']} 
type="radio" 
name="sorting" 
value="cheap"  
id="price"
 checked={sortBy==='price'}
 onChange={() => handleSortChange('price')}/>
Самый дешевый
</label>
<label className={styles['sorting__label']}>
    <input className={styles['sorting__input']} 
    type="radio"
     name="sorting"
      value="fast"
      id="speed"
       onChange={() => handleSortChange('speed')}
       checked={sortBy==='speed'}/>
Самый быстрый
</label>
<label className={styles['sorting__label']}>
<input className={styles['sorting__input']} 
type="radio" 
name="sorting" 
value="optimal"
id="optimal" 
onChange={() => handleSortChange('optimal')}
checked={sortBy==='optimal'}/>
Оптимальный
</label>


</div>
)}

    


export default Sorting;