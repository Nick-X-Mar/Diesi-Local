import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Sad from '../assets/icons/sad-face.svg';
import Arrow from '../assets/icons/arrow-down.svg';

import '../styles/error.scss';

const NotFoundPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title="404: Not Found"
                description={'Η σελίδα που ζητήσατε δεν βρέθηκε!'}
                url={`${process.env.GATSBY_SITE_URL}/404`}
            />
            <div className="Error">
                <div className="placeholder">
                    <div className="icon">
                        <Sad />
                    </div>
                    <div className="title">ΟΟΥΠΣ! Η ΣΕΛΙΔΑ ΔΕΝ ΥΠΑΡΧΕΙ!</div>
                    <Link to="/" className="home">
                        <span>ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ</span>
                        <span>
                            <Arrow />
                        </span>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
