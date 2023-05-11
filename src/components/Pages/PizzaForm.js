import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Form,FormGroup,Input,Label,Button,FormFeedback} from 'reactstrap';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import "../Styles/pizzaForm.css"
import logo from '../../components/logo.svg';

const PizzaForm= () => {

    const [isFormValid, setFormValid] = useState(false);
    const [pizzaCard, setPizzaCard] = useState({
        isim:"Position Absolute Acı Pizza",
        boy:"",
        hamur:"",
        adet: 1,
        ozelSecim:[],
        fiyat:85.50,
        not:"",
        aciklama:"Frontend Dev olarak hala position: absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir."
        });

    const [boyutSec, setBoyutsec] = useState('');
    const boyutSecenek = ['Küçük', 'Orta', 'Büyük'];

    const handleBoyutDeğisim = (event) => {
        setBoyutsec(event.target.value);
    };

    const malzemeler = ["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Jalepeno", "Sarımsak", "Biber", "Sucuk", "Ananas", "Kabak"];

    const formSema = Yup.object().shape({
        isim: Yup.string()
            .required("Ürün isim alanı zorunludur!")
            .min(2, "İsim en az 2 karakter olmalıdır."),
        boy: Yup.string().required("Lütfen pizzanızın boyutunu seçiniz."),
        hamur: Yup.string().required("Lütfen pizzanızın hamurunu seçiniz."),
        ozelSecim: Yup.array().required().min(4, "En az 4 malzeme seçmelisiniz."),

    });

    const [formErrors,setFormErrors] = useState({
        isim:"",
        boy:"",
        hamur:"",
        adet: "",
        ozelSecim:"",
        fiyat:"",
        aciklama:"",
    });

    const inputChangeHandler = (e) => {
        const {name, value, type, checked} = e.target;

        if (type === 'checkbox') {
            let updatedOzelSecim = [...pizzaCard.ozelSecim];
            if (checked) {
                updatedOzelSecim.push(name);
              } else {
                updatedOzelSecim = updatedOzelSecim.filter((item) => item !== name);
              }
              
            setPizzaCard({ ...pizzaCard, ozelSecim: updatedOzelSecim });
          } else {
            setPizzaCard({ ...pizzaCard, [name]: value });
          }

        Yup.reach(formSema, name)
        .validate(value)
        .then(() => {
            setFormErrors({...formErrors, [name]: ""});
        })
        .catch((err) => {
            setFormErrors({...formErrors, [name]: err.errors[0] });
        });
    };

    useEffect(() => {
        formSema.isValid(pizzaCard).then((valid) => {
            setFormValid(valid);
        });
    }, [pizzaCard, formSema]);

    useEffect(() => {
        console.warn("formErrors:", formErrors);
    }, [formErrors]);


  return (
    <React.Fragment>
        
        <div className='header'>
        <div className='form-img'>
        <Link id='formBaslik'to="/"> <img src={logo}/>  </Link> 
        </div>
        <p className='link-class'>
            <Link className="ana-link" to="/"> Anasayfa </Link> - Seçenekler - <Link className="pizza-link" to="/pizza"> Sipariş Oluştur </Link>
        </p>
        </div>
        <div className='tum-sayfa'>
        <h3 className='pizza-adi'>{pizzaCard.isim}</h3>
        <div className="fiyat">
            <p>{pizzaCard.fiyat}₺</p>
        </div>
        <div className="aciklama">
          <p>
            {pizzaCard.aciklama}
          </p>
        </div>
        <Form onSubmit={(event) => {
            event.preventDefault();
            axios.post("https://reqres.in/api/users", pizzaCard)
            .then((res) => {
                console.log("Yeni pizza siparişi >", res);
            });
        }}
        >
            <div className='boyut-hamur'>
                <div className='hamur'>
            <FormGroup>
                <Label htmlFor='size-dropdown'>Hamur Seç <br/></Label>
                <Input id='size-dropdown'
                    name='boy'
                    type='select'
                    onChange={inputChangeHandler}
                    value={pizzaCard.hamur}
                    invalid={!!formErrors.hamur}
                >
                    <option value="">Hamur Kalınlığı</option>
                    <option value="small">İnce</option>
                    <option value="medium">Orta</option>
                    <option value="large">Kalın</option>
        </Input>
                {formErrors.hamur && (<FormFeedback> {formErrors.hamur} </FormFeedback>)}
            </FormGroup>
            </div>
            <div className='boyut'>
        <FormGroup>
                <Label htmlFor='hamur-boyut'style={{ fontWeight: 'bold' }}>Boyut Seç</Label>
                {boyutSecenek.map((boyut) => (
                <div key={boyut} className="checkbox-secenek">
                <Input type="radio"
                    id={boyut}
                    name="boy"
                    value={boyut}
                    checked={boyutSec === boyut}
                    onChange={handleBoyutDeğisim}
                    invalid={!!formErrors.boy}
                />
            <Label htmlFor={boyut}>{boyut}</Label>
            </div>))}
            {formErrors.boy && (<FormFeedback> {formErrors.boy} </FormFeedback>)}
        </FormGroup>
        </div>
        </div>

     <div className='ek-malzeme-bolum'>      
        <FormGroup>
  <Label htmlFor='special-text'>
    <p className='ek-malzemeler'>Ek malzemeler</p>
    </Label>
  <p className='ek-aciklama'>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
  <div className='malzeme-list'>
  {malzemeler.map((malzeme) => (
    <div key={malzeme} className="checkbox-secenek">
      <Input
        type="checkbox"
        id={malzeme}
        name={malzeme}
        checked={pizzaCard.ozelSecim.includes(malzeme)}
        onChange={inputChangeHandler}
      />
      <Label htmlFor={malzeme}>{malzeme}</Label>
    </div>
  ))}
  {formErrors.ozelSecim && (<FormFeedback> {formErrors.ozelSecim} </FormFeedback>)}
  </div>
</FormGroup>

</div> 

<div className='siparis-notu'>
            <FormGroup>
                <Label htmlFor='siparis-not'>Sipariş Notu <br/></Label>
                <Input id='siparis-not'
                    name='not'
                    type='text'
                    onChange={inputChangeHandler}
                    value={pizzaCard.not}
                    invalid={!!formErrors.not}
                />
                {formErrors.not && (<FormFeedback> {formErrors.not} </FormFeedback>)}
            </FormGroup>

            </div>

            <Button color='#FDC913' type='submit' disabled={!isFormValid}>
                Sipariş Ver
            </Button>
        </Form>
        </div>
    </React.Fragment>
  );
};

export default PizzaForm
