import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Icon from './Icon';
import { buttons, shadows } from './styles';
import GoBackButton from './GoBackButton';

const StyledAuthenticationPage = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CustomIconWrapper = styled.span`
  width: 300px;
  height: 200px;
  margin-top: -150px;
`;

const NetlifyLogoIcon = styled(Icon)`
  color: #c4c6d2;
  margin-top: -300px;
`;

const NetlifyCreditIcon = styled(Icon)`
  color: #c4c6d2;
  position: absolute;
  bottom: 10px;
`;

function CustomLogoIcon({ url }) {
  return (
    <CustomIconWrapper>
      <img src={url} alt="Logo" />
    </CustomIconWrapper>
  );
}

function renderPageLogo(logoUrl) {
  if (logoUrl) {
    return <CustomLogoIcon url={logoUrl} />;
  }
  return <NetlifyLogoIcon size="300px" type="netlify-cms" />;
}

const LoginButton = styled.button`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};
  &[disabled] {
    ${buttons.disabled};
  }

  padding: 0 12px;
  margin-top: -40px;
  display: flex;
  align-items: center;
  position: relative;
`;

const TextButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${buttons.grayText};

  margin-top: 40px;
  display: flex;
  align-items: center;
  position: relative;
`;

const PermissionsDisclaimerContainer = styled.p`
  text-align: center;
  margin-top: 20px;
  margin-block-end: 0;
`;
const permissionsIssueLink = "https://github.com/community/community/discussions/37117#discussioncomment-3973136"
const ghPermissionsDisclaimer = (
  <PermissionsDisclaimerContainer>
    Note: github does not show fine-grained permissions requested 
    (<a href={permissionsIssueLink}>link to issue</a>), only <strong>"Act on your behalf"</strong>. 
    <br />
    The actual permissions granted are confined only to the playbooks repo. 
    <br /><br />
    They are: <i>"Read/Write Repository Contents"</i>, <i>"Read/Write Pull Requests"</i>, and
    <i>"Read Organization membership"</i>.
    <br />
    These are used to create commits & PRs as you, and to check that you are a member of Canva.
  </PermissionsDisclaimerContainer>
);

function AuthenticationPage({
  onLogin,
  loginDisabled,
  loginErrorMessage,
  renderButtonContent,
  renderPageContent,
  logoUrl,
  siteUrl,
  t,
}) {
  return (
    <StyledAuthenticationPage>
      {renderPageLogo(logoUrl)}
      {loginErrorMessage ? <p>{loginErrorMessage}</p> : null}
      {!renderPageContent
        ? null
        : renderPageContent({ LoginButton, TextButton, showAbortButton: !siteUrl })}
      {!renderButtonContent ? null : (
        <LoginButton disabled={loginDisabled} onClick={onLogin}>
          {renderButtonContent()}
        </LoginButton>
      )}
      {ghPermissionsDisclaimer}
      {siteUrl && <GoBackButton href={siteUrl} t={t} />}
      {logoUrl ? <NetlifyCreditIcon size="100px" type="netlify-cms" /> : null}
    </StyledAuthenticationPage>
  );
}

AuthenticationPage.propTypes = {
  onLogin: PropTypes.func,
  logoUrl: PropTypes.string,
  siteUrl: PropTypes.string,
  loginDisabled: PropTypes.bool,
  loginErrorMessage: PropTypes.node,
  renderButtonContent: PropTypes.func,
  renderPageContent: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default AuthenticationPage;
