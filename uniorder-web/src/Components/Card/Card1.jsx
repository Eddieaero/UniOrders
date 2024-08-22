import galley1 from '../../assets/gallery1.svg';
import galley2 from '../../assets/gallery2.svg';
import galley3 from '../../assets/gallery3.svg';
import galley4 from '../../assets/gallery4.svg';
import galley5 from '../../assets/gallery5.svg';

const Card1 = () => {
    return (
        <div className="p-lg-3 card1" >
            <div className='p-lg-3'>
                <p style={{color: "white", fontSize: "36px", fontWeight: "normal"}}>History</p>
                <p style={{color: "white", fontSize: "36px", fontWeight: "normal", marginTop:"-25px"}}>Connects us all</p>
                <p style={{color: "white", fontSize: "16px", fontWeight: "normal", marginTop:"-20px"}}>Filling galleries with memories and more....</p>
                <div className='m-lg-5 m-sm-5 card1-scroll-container'>
                    <div className='p-lg-5 p-sm-5 card1-images'>
                        <div><img src={galley1} className='card1-image1 ' /></div>
                        <div><img src={galley2} className='card1-image2 ' /></div>
                        <div><img src={galley3} className='card1-image1 ' /></div>
                        <div><img src={galley4} className='card1-image2 ' /></div>
                        <div><img src={galley5} className='card1-image1 ' /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Card1;


