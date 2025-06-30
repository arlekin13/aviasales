import React from 'react';
import styles from './FilterPanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTransfer, setAllTransfers} from '../../components/store/slices/filterSlice';


function FilterPanel() {

    const dispatch = useDispatch();
    const filters= useSelector((state)=> state.filter.transfers);



    const handleSetAllTransfersChange = (event) => {
        dispatch(setAllTransfers(event.target.checked));
    }

    const handleSetTransfersChange = (transfer)=>(event)=>{
        dispatch(setTransfer({transfer,value:event.target.checked}))
    }


    return (
        <div className={styles['filter-panel']}>
            <h2 className={styles['filter-panel__title']}>Количество пересадок</h2>
            <ul className={styles['filter-panel__list']}>
                <li className={styles['filter-panel__item']}>
                    <label className={styles['filter-panel__label']}>
                <input className={styles['filter-panel__input']} type="checkbox" 
                checked={filters.all}
                onChange={handleSetAllTransfersChange}/>
                Все
            </label>
        </li>
        <li className={styles['filter-panel__item']}>
        <label className={styles['filter-panel__label']}>
            <input className={styles['filter-panel__input']} type="checkbox" 
            checked={filters.noTransfers}
            onChange={handleSetTransfersChange('noTransfers')}/>
            Без пересадок
        </label>
        </li>
        <li className={styles['filter-panel__item']}>
        <label className={styles['filter-panel__label']}>
            <input className={styles['filter-panel__input']} type="checkbox" 
            checked={filters.oneTransfers}
            onChange={handleSetTransfersChange('oneTransfers')}/>
            1 пересадка
        </label>
        </li>
        <li className={styles['filter-panel__item']}>
        <label className={styles['filter-panel__label']}>
            <input className={styles['filter-panel__input']} type="checkbox" 
            checked={filters.twoTransfers}
            onChange={handleSetTransfersChange('twoTransfers')}/>
            2 пересадка
            </label>
        </li>
        <li className={styles['filter-panel__item']}>
        <label className={styles['filter-panel__label']}>
            <input className={styles['filter-panel__input']} type="checkbox" 
            checked={filters.threeTransfers}
            onChange={handleSetTransfersChange('threeTransfers')}/>
        3 пересадка
        </label>
        </li>
        

       </ul>
      
        </div>
    )
}

export default FilterPanel;