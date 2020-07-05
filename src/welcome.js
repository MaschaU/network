import React from 'react';
import Registration from './registration';

export default function Welcome() {
    return (
        <div>
            <h1>Welcome. The social network is still a work in progress. Bear with us.</h1>
            <div>
                <Registration />
            </div>
        </div>
    );
}