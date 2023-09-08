import React from 'react';
import Official1 from "../user-components/assets/img/Official1.jpg";
import Official2 from "../user-components/assets/img/Official2.jpg";
import Official3 from "../user-components/assets/img/Official3.jpg";
import Official4 from "../user-components/assets/img/Official4.jpg";
import Official5 from "../user-components/assets/img/Official5.jpg";
import Official6 from "../user-components/assets/img/Official6.jpg";
import Official7 from "../user-components/assets/img/Official7.jpg";
import Official8 from "../user-components/assets/img/Official8.jpg";
import Official9 from "../user-components/assets/img/Official9.jpg";
import Official10 from "../user-components/assets/img/Official10.jpg";
import Official11 from "../user-components/assets/img/Official11.jpg";


const BrgyOfficial = () => {
  return (
    <div className='officials' id='officials'>

    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#0060AD', fontWeight: 'bold' }}>
        BARANGAY HARAPIN ANG BUKAS COUNCIL
      </h2>
      <p style={{ textAlign: 'center', color: '#0060AD', fontWeight: 'bold' }}>
        Description about barangay officials goes here.
      </p>

      <div className="pt-5">
        <div className="text-center">
          <img className="rounded-circle official-list" src={Official1} />
          <h4>Hon. Federico Y. Ogbac</h4>
          <p>Punong Barangay</p>
        </div>
      </div>

      <div className="d-flex justify-content-evenly">

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official2} />
          <h4>Hon. Jeffrey L. Angeles</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official3} />
          <h4>Hon. Zenaida R. Candelaria</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official4} />
          <h4>Hon. Joselito R. Eleazar</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official5} />
          <h4>Hon. Arvin R. Arcangel</h4>
          <p>Kagawad</p>
        </div>

      </div>

      <div className="d-flex justify-content-evenly">

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official6} />
          <h4>Hon. Jerry C. Buenaventura</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official7} />
          <h4>Hon. Susana S. Lopez</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official8} />
          <h4>Hon. Mark Joseph D. Quieta</h4>
          <p>Kagawad</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official9} />
          <h4>Hon. Ellice B. Ignacio</h4>
          <p>SK Chairwoman</p>
        </div>

      </div>

      <div className="d-flex justify-content-evenly">

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official10} />
          <h4>Dyan Grace L. Cortes</h4>
          <p>Barangay Secretary</p>
        </div>

        <div className="text-center">
          <img className="rounded-circle official-list" src={Official11} />
          <h4>Allan Roy C. Agustin</h4>
          <p>Barangay Treasurer</p>
        </div>

      </div>
    </div>
    </div>
  );
};

export default BrgyOfficial;
