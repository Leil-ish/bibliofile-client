import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import TokenService from '../../services/token-service';

export default function PublicOnlyRoute({ component, ...props }) {
  //Handles rendering for routes that do not require auth
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/library'} />
          : <Component {...componentProps} />
      )}
    />
  )
}
