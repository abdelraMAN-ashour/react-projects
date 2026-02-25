import classes from './TimeZone.module.css';
import TIMEZONES from './timeZoneData.js';

export default function TimeZone({onChangeTimeZone ,curTimeZone}){
    return <section className={classes.container}>
        <select value={curTimeZone} onChange={(e)=>{onChangeTimeZone(e.target.value)}}>
            {TIMEZONES.map(tz=><option key={tz} value={tz}>{tz.split('/')[1].replaceAll('_',' ')}</option>)}
        </select>
    </section>
}