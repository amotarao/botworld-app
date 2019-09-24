/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppEditor } from '../../organisms/AppEditor';
import { style } from './styled';

export const BotSingleInner: React.FC = ({ children }) => {
  return (
    <div css={style.wrapper}>
      <p>{children}</p>
      <AppEditor />
    </div>
  );
};

export const BotSingleContainer: React.FC<RouteComponentProps> = ({ match }) => {
  const { id } = match.params as { id: string };
  return (
    <BotSingleInner>
      ID: <b>{id}</b>
    </BotSingleInner>
  );
};

export const BotSingle = withRouter(BotSingleContainer);
