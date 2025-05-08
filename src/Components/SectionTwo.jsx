const SectionTwo = () => {

    return ( 
    <div className="row p-5">
        <div className="col-md-3">
            <div className=" justify-content-center mt-4">
                <div className="card-body">
                    <img  src = "/images/borrow1.webp" alt=""/>
                
                    <h4>Borrow items</h4>
                    <p>Borrow things from your neighbours instead of buying</p>
                </div>

            </div>

        </div>
        <div className="col-md-3">
            <div className=" justify-content-center mt-4">
                <div className="card-body">
                    <img src = "images/lend.png" alt=""/>
                
                    <h4>Lend goods</h4>
                    <p>60% of your goods are useless. Make money by lending them.</p>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="justify-content-center mt-4">
                    <div className="card-body">
                        <img src = "images/save3.webp" alt=""/>
                    
                        <h4>Save more</h4>
                        <p>Buy less. Rent for a fraction of the cost.</p>
                    </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="justify-content-center mt-4">
                    <div className="card-body">
                        <img src = "images/earth.webp" alt=""/>
                    
                        <h4>eco-friendly way</h4>
                        <p>one equipment can fill the needs of hundreds creating sustainability. </p>
                    </div>
            </div>
        </div>
    </div>
      );
}
 
export default SectionTwo;