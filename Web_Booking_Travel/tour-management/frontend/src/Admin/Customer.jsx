import React, { useState } from 'react';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPhoneFill, BsDash,BsPencil, } from 'react-icons/bs';
import '../styles/customer.css';
import Pagination from '../shared/pagination';
import SelectLimit from '../shared/selectLimit';


function Customer() {
  const [customers, setCustomers] = useState([
    {
      "id": 1,
      "name": "Marlie Shemming",
      "email": "mshemming0@cbc.ca",
      "phone": "456-762-0266"
    }, {
      "id": 2,
      "name": "Janet Shaw",
      "email": "jshaw1@tripod.com",
      "phone": "705-340-9379"
    }, {
      "id": 3,
      "name": "Rebeca Rebeiro",
      "email": "rrebeiro2@uol.com.br",
      "phone": "627-565-7722"
    }, {
      "id": 4,
      "name": "Leda Loft",
      "email": "lloft3@ehow.com",
      "phone": "386-682-8495"
    }, {
      "id": 5,
      "name": "Lilas Schuchmacher",
      "email": "lschuchmacher4@dell.com",
      "phone": "486-244-6708"
    }, {
      "id": 6,
      "name": "Gennifer Feldberger",
      "email": "gfeldberger5@diigo.com",
      "phone": "761-251-6516"
    }, {
      "id": 7,
      "name": "Shoshanna Dowbekin",
      "email": "sdowbekin6@barnesandnoble.com",
      "phone": "596-310-3063"
    }, {
      "id": 8,
      "name": "Wren Schule",
      "email": "wschule7@nhs.uk",
      "phone": "387-354-0042"
    }, {
      "id": 9,
      "name": "Althea Corkitt",
      "email": "acorkitt8@imdb.com",
      "phone": "653-244-8399"
    }, {
      "id": 10,
      "name": "Lavinie Chaplyn",
      "email": "lchaplyn9@godaddy.com",
      "phone": "928-564-2699"
    }, {
      "id": 11,
      "name": "Nedi Driussi",
      "email": "ndriussia@google.com.br",
      "phone": "978-338-2314"
    }, {
      "id": 12,
      "name": "Victoria Lindell",
      "email": "vlindellb@webnode.com",
      "phone": "822-940-4870"
    }, {
      "id": 13,
      "name": "Stephanie Finding",
      "email": "sfindingc@adobe.com",
      "phone": "601-295-5942"
    }, {
      "id": 14,
      "name": "Celia Woliter",
      "email": "cwoliterd@hhs.gov",
      "phone": "775-630-4030"
    }, {
      "id": 15,
      "name": "Pete Vost",
      "email": "pvoste@github.com",
      "phone": "657-867-9933"
    }, {
      "id": 16,
      "name": "Jereme Serrier",
      "email": "jserrierf@newyorker.com",
      "phone": "261-421-8561"
    }, {
      "id": 17,
      "name": "Mikel McKune",
      "email": "mmckuneg@example.com",
      "phone": "701-408-0696"
    }, {
      "id": 18,
      "name": "Germain Rappport",
      "email": "grappporth@house.gov",
      "phone": "255-650-2768"
    }, {
      "id": 19,
      "name": "Gerti Lisciandri",
      "email": "glisciandrii@yelp.com",
      "phone": "796-456-8740"
    }, {
      "id": 20,
      "name": "Marcelo Skittle",
      "email": "mskittlej@paypal.com",
      "phone": "164-662-6758"
    }, {
      "id": 21,
      "name": "Ailey Fritzer",
      "email": "afritzerk@usa.gov",
      "phone": "494-926-9187"
    }, {
      "id": 22,
      "name": "Drona Tolhurst",
      "email": "dtolhurstl@foxnews.com",
      "phone": "298-913-1964"
    }, {
      "id": 23,
      "name": "Sargent Habin",
      "email": "shabinm@patch.com",
      "phone": "124-893-7256"
    }, {
      "id": 24,
      "name": "Gabriel Heinschke",
      "email": "gheinschken@rakuten.co.jp",
      "phone": "895-453-8118"
    }, {
      "id": 25,
      "name": "Elliot Dietsche",
      "email": "edietscheo@irs.gov",
      "phone": "732-518-0009"
    }, {
      "id": 26,
      "name": "Estrella Semper",
      "email": "esemperp@toplist.cz",
      "phone": "203-646-9798"
    }, {
      "id": 27,
      "name": "Penny Guyot",
      "email": "pguyotq@blogs.com",
      "phone": "796-887-5409"
    }, {
      "id": 28,
      "name": "Ola Cockshoot",
      "email": "ocockshootr@umn.edu",
      "phone": "538-976-8077"
    }, {
      "id": 29,
      "name": "Lindsy Leroy",
      "email": "lleroys@google.ca",
      "phone": "616-190-9317"
    }, {
      "id": 30,
      "name": "Oralia Lewty",
      "email": "olewtyt@people.com.cn",
      "phone": "350-164-7173"
    }, {
      "id": 31,
      "name": "Agnesse Donnan",
      "email": "adonnanu@illinois.edu",
      "phone": "473-921-7736"
    }, {
      "id": 32,
      "name": "Steffi Rossoni",
      "email": "srossoniv@google.com.br",
      "phone": "470-623-3132"
    }, {
      "id": 33,
      "name": "Penny McGready",
      "email": "pmcgreadyw@zdnet.com",
      "phone": "316-794-4613"
    }, {
      "id": 34,
      "name": "Ammamaria Biggerdike",
      "email": "abiggerdikex@icq.com",
      "phone": "420-182-1624"
    }, {
      "id": 35,
      "name": "Otis Le Merchant",
      "email": "oley@meetup.com",
      "phone": "179-973-7116"
    }, {
      "id": 36,
      "name": "Amelie Regi",
      "email": "aregiz@ucoz.com",
      "phone": "271-701-2244"
    }, {
      "id": 37,
      "name": "Bobbi De Marchi",
      "email": "bde10@tinyurl.com",
      "phone": "488-327-3349"
    }, {
      "id": 38,
      "name": "Joeann Monget",
      "email": "jmonget11@bigcartel.com",
      "phone": "726-940-4587"
    }, {
      "id": 39,
      "name": "Evonne Freathy",
      "email": "efreathy12@ezinearticles.com",
      "phone": "117-141-0088"
    }, {
      "id": 40,
      "name": "Glad Ralston",
      "email": "gralston13@mayoclinic.com",
      "phone": "563-616-0270"
    }, {
      "id": 41,
      "name": "Fanechka Conechie",
      "email": "fconechie14@t-online.de",
      "phone": "498-918-1152"
    }, {
      "id": 42,
      "name": "Ruthanne Catford",
      "email": "rcatford15@surveymonkey.com",
      "phone": "561-363-9059"
    }, {
      "id": 43,
      "name": "Alfredo Arnaldo",
      "email": "aarnaldo16@blogspot.com",
      "phone": "418-243-5494"
    }, {
      "id": 44,
      "name": "Helli Daggett",
      "email": "hdaggett17@businessinsider.com",
      "phone": "512-745-9580"
    }, {
      "id": 45,
      "name": "Harwilll McGarrell",
      "email": "hmcgarrell18@istockphoto.com",
      "phone": "810-114-8709"
    }, {
      "id": 46,
      "name": "Alex Ronald",
      "email": "aronald19@webmd.com",
      "phone": "197-206-5606"
    }, {
      "id": 47,
      "name": "Courtney Hundall",
      "email": "chundall1a@github.io",
      "phone": "751-308-0151"
    }, {
      "id": 48,
      "name": "Ann Cardenoza",
      "email": "acardenoza1b@army.mil",
      "phone": "478-818-0639"
    }, {
      "id": 49,
      "name": "Anet Spall",
      "email": "aspall1c@squarespace.com",
      "phone": "262-215-4398"
    }, {
      "id": 50,
      "name": "Whit Kaine",
      "email": "wkaine1d@squidoo.com",
      "phone": "749-507-1336"
    }
    // Add more customer data as needed
  ])
  const [editingCustomer, setEditingCustomer] = useState(null);

  const deleteCustomer = (customerId) => {
    const newCustomers = customers.filter(customer => customer.id !== customerId);
    setCustomers(newCustomers);
  };

  const editCustomer = (customerId) => {
    const customerToEdit = customers.find(customer => customer.id === customerId);
    setEditingCustomer(customerToEdit);
  };

  const saveChanges = () => {
    setEditingCustomer(null);
  };

  const cancelEditing = () => {
    setEditingCustomer(null); 
  };
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(5);
  const displayedCustomers = customers.slice((page - 1) * limit, page * limit); // Slice based on page and limit
  let totalPage = Math.ceil(customers.length / limit);
  let pageNo;
  if(page<=totalPage){
    pageNo = page;
  }else{
    setPage(totalPage);
    pageNo = page;
  }
  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);

      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  }

  return (
    <div>
      <div className="customer-container">
        <div className="customer-list">
          {displayedCustomers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div className="customer-actions">  
              <BsPencil className="customer-action" onClick={() => editCustomer(customer.id)} />
              <BsDash className="customer-action"  style={{ fontSize: '24px' }}  onClick={() => deleteCustomer(customer.id)} />
            </div>
              <div className="customer-details">
                <BsFillPersonFill className="customer-icon" />
                <h3 className="customer-name">{customer.name}</h3>
              </div>
              <div className="customer-info">
                <div className="customer-item">
                  <BsFillEnvelopeFill className="customer-info-icon" />
                  <span className="customer-info-text">{customer.email}</span>
                </div>
                <div className="customer-item">
                  <BsFillPhoneFill className="customer-info-icon" />
                  <span className="customer-info-text">{customer.phone}</span>
                </div>
                <div className="customer-item">
                  <BsDash className="customer-info-icon" />
                  <span className="customer-info-text">{customer.phone}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
        {editingCustomer && (
        <div className="edit-customer-form">
          <h2>Edit Customer</h2>
          <input type="text" value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} />
          <input type="text" value={editingCustomer.email} onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })} />
          <input type="text" value={editingCustomer.phone} onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })} />
          <button onClick={saveChanges}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
      </div>
      <div className="customer-footer">
        <div className="pagination-container">
            <SelectLimit onLimitChange={setLimit} />
            <Pagination totalPage={totalPage} page={pageNo} limit={limit} siblings={1} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
  
  );
}

export default Customer;