import * as React from 'react';
import * as Hello from './wrapper/hello';
import {Route, IndexRoute} from 'react-router';

function lazyLoadComponent(lazyModule: any): any {
    return (location: any, cb: any) => {
        lazyModule((module: any) => cb(null, module.default))
    }
}

export default (
    <Route path="/">
        <IndexRoute getComponent={lazyLoadComponent(Hello)}></IndexRoute>
        <Route path="/home">
            <IndexRoute getComponent={lazyLoadComponent(Hello)}></IndexRoute>
        </Route>
    </Route>
);