import React from 'react';
import styles from './app.module.scss';
import {MainContent} from "./widgets/mainContent/mainContent";

function App() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.vertical__line}/>
                <MainContent/>
            </div>
            {/*<div className={styles.wrapper}>*/}
            {/*    <div className={styles.vertical__line}/>*/}
            {/*    <MainContent/>*/}
            {/*</div>*/}
        </>
    );
}

export default App;
