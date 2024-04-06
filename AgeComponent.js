import arrow from './icon-arrow.svg';
import '../App.css';
import {useState} from 'react';

export default function AgeComponent() {
    const [message, setMessage]=useState('');
    const [message1, setMessage1]=useState('');
    const [message2, setMessage2]=useState('');
    const [day, setDay]=useState('--');
    const [month, setMonth]=useState('--');
    const [year, setYear]=useState('--');
    const [dd, setDD]=useState('');
    const [mm, setMM]=useState('');
    const [yyyy, setYYYY]=useState('');
    function handleKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        if (keyCode < 48 || keyCode > 57) {
            event.preventDefault(); // Prevent the default action (character input)
        }
    }
    function handleSubmit(){
        const date = new Date();
        const givedate = new Date(`${mm}-${dd}-${yyyy}`);
        console.log(givedate);
        if (!dd || !mm || !yyyy) {
            // Set border color of empty fields to red
            if (!dd) {
                document.getElementById('dayIn').classList.add('error');
                document.querySelector('.input > div:nth-child(1) > h6').classList.add('txt');
                setMessage('This field is required');
            }else{
                document.getElementById('dayIn').classList.remove('error');
                document.querySelector('.input > div:nth-child(1) > h6').classList.remove('txt');
                setMessage('');
            }
            if (!mm){
                document.getElementById('monthIn').classList.add('error');
                document.querySelector('.input > div:nth-child(2) > h6').classList.add('txt');
                setMessage1('This field is required');
            }else{
                document.getElementById('monthIn').classList.remove('error');
                document.querySelector('.input > div:nth-child(2) > h6').classList.remove('txt');
                setMessage1('');
            }
            if (!yyyy){
                document.getElementById('yearIn').classList.add('error');
                document.querySelector('.input > div:nth-child(3) > h6').classList.add('txt');
                setMessage2('This field is required');
            }else{
                document.getElementById('yearIn').classList.remove('error');
                document.querySelector('.input > div:nth-child(3) > h6').classList.remove('txt');
                setMessage2('');
            }
            return;
        }else if(parseInt(dd)>30 || parseInt(dd)<1 || parseInt(mm)>12 || parseInt(mm)<1 || givedate>date) {
            // Set border color of empty fields to red
           if((parseInt(dd)>30 || parseInt(dd)<1 )){
             document.getElementById('dayIn').classList.add('error');
             document.querySelector('.input > div:nth-child(1) > h6').classList.add('txt');
             setMessage('Must be a vaild day');
            }else{
                document.getElementById('dayIn').classList.remove('error');
                document.querySelector('.input > div:nth-child(1) > h6').classList.remove('txt');
                setMessage('');
            } 
           if((parseInt(mm) > 12 || parseInt(mm) < 1) ){
            document.getElementById('monthIn').classList.add('error');
            document.querySelector('.input > div:nth-child(2) > h6').classList.add('txt');
            setMessage1('Must be a vaild month');
        }else{
            document.getElementById('monthIn').classList.remove('error');
            document.querySelector('.input > div:nth-child(2) > h6').classList.remove('txt');
            setMessage1('');
        }
           if(givedate>date){
             document.getElementById('yearIn').classList.add('error');
             document.querySelector('.input > div:nth-child(3) > h6').classList.add('txt');
             setMessage2('Must be a past year');
            }else{
                document.getElementById('yearIn').classList.remove('error');
                document.querySelector('.input > div:nth-child(3) > h6').classList.remove('txt');
                setMessage2('');
            }    
            return;
        }else {
            document.getElementById('dayIn').classList.remove('error');
            document.getElementById('monthIn').classList.remove('error');
            document.getElementById('yearIn').classList.remove('error');
            document.querySelector('.input > div:nth-child(1) > h6').classList.remove('txt');
            document.querySelector('.input > div:nth-child(2) > h6').classList.remove('txt');
            document.querySelector('.input > div:nth-child(3) > h6').classList.remove('txt');
            setMessage(''); 
            setMessage1(''); 
            setMessage2(''); 
        }
        
        const differenceInMilliseconds = Math.abs(date - givedate);
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const millisecondsInYear = millisecondsInDay * 365.25; // accounting for leap years
        
        const years = Math.floor(differenceInMilliseconds / millisecondsInYear);
        const remainingMilliseconds = differenceInMilliseconds % millisecondsInYear;
        
        const months = Math.floor(remainingMilliseconds / (millisecondsInDay * 30)); // Approximate number of days in a month
        const remainingDays = Math.floor(remainingMilliseconds / millisecondsInDay) % 30;
        
        console.log(`Years: ${years}, Months: ${months}, Days: ${remainingDays}`);
        if(millisecondsInDay){
        setDay(remainingDays);
        setMonth(months);
        setYear(years);
    }
        
    }
    return (
        <div className="Container">
        <div className="Content">
            <div className="input">
                <div>
                 <h6 >Day</h6>   
                <input type="text" placeHolder="DD" id="dayIn" onChange={(e)=>setDD(e.target.value)} onKeyPress={handleKeyPress}/> 
                <p className="error">{message}</p>   
                </div>   
                <div>
                 <h6>Month</h6>   
                <input type="text" placeHolder="MM" id="monthIn" onChange={(e)=>setMM(e.target.value) } onKeyPress={handleKeyPress}/> 
                <p className="error">{message1}</p>   
                </div> 
                <div>
                 <h6>Year</h6>   
                <input type="text" placeHolder="YYYY" id="yearIn" onChange={(e)=>setYYYY(e.target.value) } onKeyPress={handleKeyPress}/> 
                <p className="error">{message2}</p>   
                </div>          
            </div>
            <hr/>
            <button onClick={handleSubmit}>
                <img src={arrow} alt='Arrow'/>
            </button>
            <div class="result">
        <h1><span id="yearOut">{year}</span> years</h1>
        <h1><span id="monthOut">{month}</span> months</h1>
        <h1><span id="dayOut">{day}</span> days</h1>
            </div>
      </div>
      </div>
    );
}
