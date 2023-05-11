import React from 'react'
import {Link} from "react-router-dom";
import '../Styles/anaSayfa.css'
import HomeImg from '../Pages/adv-form-banner.png';
import PizzaForm from './PizzaForm';




const AnaSayfa = () => {
  return (

    <div className='container'>
    <h1 className='anaBaslik'>Teknolojik Yemekler</h1>
    <h2 className='anaMetin'>KOD ACIKTIRIR,<br/>
    PIZZA DOYURUR
    </h2>
    

  <Link to="/pizza" element={<PizzaForm />} >
      <button id="order-pizza">ACIKTIM</button>
  </Link>
  <div className='ana-sayfa-img'>
  <img src={HomeImg} alt="Anasayfa Fotoğrafı" />
  </div>

  </div>
  )
}

export default AnaSayfa