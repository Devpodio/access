/********************************************************************************
 * Copyright (C) 2019 Uni Sayo and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { injectable } from "inversify";
import { Application } from 'express';
import { BackendApplicationContribution } from '@devpodio/core/lib/node/backend-application';
import * as decode from 'jwt-decode';
import * as cookieParser from 'cookie-parser';
interface DecodedToken {
  aud: string[];
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sub: string;
  type: string;
  [key: string]: string[] | number | string
}

@injectable()
export class AccessContribution implements BackendApplicationContribution {
  public static readonly AUD_ACCESS: string[] | undefined = process.env.AUD_ACCESS ? process.env.AUD_ACCESS.split(',') : undefined;
  configure(app: Application): void {
    app.use(cookieParser());
    app.use(function(req, res, next) {
      if (!AccessContribution.AUD_ACCESS) return next();
      const token: string | undefined = req.headers['Cf-Access-Jwt-Assertion'] || req.cookies['CF_Authorization'];
      if (!token) {
        return res.sendStatus(403)
      }
      const decoded: DecodedToken = decode(token);
      if(new Date(decoded.exp * 1000) <= new Date()) {
        return res.redirect('/cdn-cgi/access/logout')
      }
      for (const aud of AccessContribution.AUD_ACCESS) {
        if (decoded.aud.indexOf(aud) >= 0) {
          return next();
        }
      }
      return res.sendStatus(403)
    })
  }
}