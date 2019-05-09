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

import "../../src/browser/logout.css"
import { injectable } from "inversify";
import { FrontendApplicationContribution } from '@devpodio/core/lib/browser';

@injectable()
export class LogoutContribution implements FrontendApplicationContribution {

  async onStart(): Promise<void> {
    await this.createLogout();
  }

  protected createLogout(): Promise<HTMLElement> {
    return new Promise(resolve => {
      console.info('Creating Logout')
      const logoutEl = document.createElement('a')
      logoutEl.id = 'theia:logout';
      logoutEl.className = 'theia-logout';
      logoutEl.href = window.location.origin + '/cdn-cgi/access/logout';
      logoutEl.target = '_self';
      const logoutIcon = document.createElement('span');
      logoutIcon.id = 'theia:logouticon';
      logoutIcon.className = 'fa fa-power-off'
      logoutEl.appendChild(logoutIcon);
      document.body.appendChild(logoutEl)
      console.info('Logout Appended');

      resolve();
    })
  }
}