import React from 'react';


const Paginations = ({ usersPerPage, totalUsers, paginate,currentPage,changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
   
    <nav>
      <ul className='pagination'>
        
      {currentPage > 1 ?
    <button onClick={() => changePage('back')}>perv page</button>
   : null}
        
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}
        {totalUsers -1 > currentPage * usersPerPage ?
    <button onClick={() => changePage('next')}>next page</button>
   : null}
      </ul>
    </nav>
  );
};

export default Paginations;