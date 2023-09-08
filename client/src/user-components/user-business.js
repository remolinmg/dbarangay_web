import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/js/dist/dropdown';
import './assets/css/user-style.css';
import Footer from "./footer"
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot"

function UserBusiness() {
    return (
        <body>
            <UserNav />
            <section className="category-section pt-5" >
                <div className="section-title p-5">
                    <h1 className="text-white">BUSINESS</h1>
                </div>
                <div className="section-content">
                    <div className="card category grocery">
                        <div className="card-body cat-content-container">
                            <h5 className="card-title">Grocery Store</h5>
                        </div>
                    </div>
                    <div className="card category">
                        <div className="card-body cat-content-container">
                            <h5 className="card-title">Hardware</h5>

                        </div>
                    </div>
                    <div className="card category">
                        <div className="card-body cat-content-container">
                            <h5 className="card-title">Fast Food</h5>
                        </div>
                    </div>
                    <div className="card category">
                        <div className="card-body cat-content-container">
                            <h5 className="card-title">Others</h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="business-section">
                <div className="business-content">
                    <div className="card business">
                        <div className="card-body business-content-container">
                            <h5 className="card-title">Grocery Store</h5>
                        </div>
                    </div>
                    <div className="card business">
                        <div className="card-body business-content-container">
                            <h5 className="card-title">Hardware</h5>

                        </div>
                    </div>
                    <div className="card business">
                        <div className="card-body business-content-container">
                            <h5 className="card-title">Banks</h5>
                        </div>
                    </div>
                    <div className="card business">
                        <div className="card-body business-content-container">
                            <h5 className="card-title">Fast Food</h5>
                        </div>
                    </div>
                    <div className="card business">
                        <div className="card-body business-content-container">
                            <h5 className="card-title">Others</h5>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollToTopButton />
            <Footer />
            <Bot />
        </body>
    );
}

export default UserBusiness;
