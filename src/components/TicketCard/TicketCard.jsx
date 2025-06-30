import React from 'react';
import styles from './TicketCard.module.scss';



function TicketCard({ticket}) {
    console.log(ticket)
    const formatStops=(stops)=>{
        if(stops.length===0){
            return 'БЕЗ ПЕРЕСАДОК'
        }
        if(stops.length===1){
            return '1 ПЕРЕСАДКА'
        }
        if(stops.length===2){
            return '2 ПЕРЕСАДКИ'    
        }
        return `${stops.length} ПЕРЕСАДОК`
    }
    const formatTime= (duration)=>{
        const hours=Math.floor(duration/60)
        const minutes=duration%60
        return `${hours}ч ${minutes}м`
    }

    const formatData=(data)=>{
        const date=new Date(data)
        const options={
            hour:'2-digit',
            minute:'2-digit',
            hour12:false
        }
        return date.toLocaleTimeString('ru-RU',options)
    }

    const getArrivalTime=(deparatureDate,duration)=>{
        const deparature = new Date(deparatureDate)
        const arrival = new Date((deparature).getTime()+duration*60000)

        return arrival.toLocaleTimeString('ru-RU',{
            hour:'2-digit',
            minute:'2-digit',
            hour12:false})
    }


    return(
<div className={styles['ticket-card']}>
   <div className={styles['ticket-card__header']}>
    {ticket.price} Р 
    <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} 
    alt={`Лого ${ticket.carrier}`} />
                </div> 
    <div className={styles['ticket-card__body']}>
{ticket.segments.map((segment,index)=>(
    <div key={index} className={styles['ticket-card__body-info']}>
        <div className={styles['ticket-card__body-info-text']}>
            <span className={styles['ticket-card__body-info-text-top']}>
                {segment.origin} – {segment.destination}
            </span>
            <span className={styles['ticket-card__body-info-text-bottom']}>
                {formatData(segment.date)}-{getArrivalTime(segment.date,segment.duration)}
            </span>
        </div>

        <div className={styles['ticket-card__body-info-text']}>
            <span className={styles['ticket-card__body-info-text-top']}>
                В ПУТИ
            </span>
            <span className={styles['ticket-card__body-info-text-bottom']}>
                {formatTime(segment.duration)}
            </span>
        </div>

        <div className={styles['ticket-card__body-info-text']}>
            <span className={styles['ticket-card__body-info-text-top']}>
                {formatStops(segment.stops)}
            </span>
            <span className={styles['ticket-card__body-info-text-bottom']}>
                {segment.stops.join(', ')}
            </span>
        </div>

    </div>
))} 


    </div>

</div>




    )
}
export default TicketCard;