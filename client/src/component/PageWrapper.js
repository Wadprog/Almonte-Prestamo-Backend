import React, { Fragment } from "react";
import SideNav from "./layout/SideNav";
import Alert from "./Alert";
const PageWrapper = props => {
  return (
    <div>
      <Fragment>
        <div className='page-wrapper chiller-theme'>
          <a id='show-sidebar' className='btn btn-sm btn-dark' href='#'>
            <i className='fa fa-bars' />
          </a>
          <SideNav />
          <main className='page-content'>
            <div className='container-fluid'>
              <Alert />
              {props.children}
            </div>
          </main>
        </div>
      </Fragment>
    </div>
  );
};

export default PageWrapper;
