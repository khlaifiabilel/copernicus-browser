import React from 'react';
import { t } from 'ttag';
import LogoutButton from './LogoutButton';
import useLoginLogout from './loginLogout/useLoginLogout';
import {
  LOCAL_STORAGE_RECAPTCHA_CONSENT_KEY,
  removeItemFromLocalStorage,
  saveAnonTokenToLocalStorage,
} from './authHelpers';
import store, { authSlice } from '../store';

const UserAuth = (props) => {
  const { doLogin, doLogout } = useLoginLogout();

  const { user } = props;

  return (
    <span className="user-panel">
      {user ? (
        <LogoutButton
          user={user}
          onLogOut={doLogout}
          handleLogoutDropdownState={props.handleLogoutDropdownState}
          isLogoutSelectClicked={props.isLogoutSelectClicked}
        />
      ) : (
        <div
          className="login-button"
          onClick={() => {
            removeItemFromLocalStorage(LOCAL_STORAGE_RECAPTCHA_CONSENT_KEY);
            store.dispatch(authSlice.actions.setAnonToken(null));
            saveAnonTokenToLocalStorage(null);
            doLogin();
          }}
          title={
            t`Login to unlock advanced features such as timelapse, analytical download, own configurations and more.` +
            '\n\n' +
            t`By logging in you will revoke the consent to the use of cookies by recaptcha.net and related collection, sharing and use of personal data by recaptcha.net.`
          }
        >
          {t`Login`}
        </div>
      )}
    </span>
  );
};

export default UserAuth;