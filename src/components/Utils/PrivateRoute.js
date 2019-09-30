import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import TokenService from '../../services/token-service';

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      //Handle rendering for all routes that require auth tokens/redirects in absence of auth token
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}
