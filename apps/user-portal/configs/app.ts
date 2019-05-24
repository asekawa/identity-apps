/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

type ServiceEndpointType = string;
type ServiceResourcesType = {
    login: string;
    user: string;
    users: string;
};

export const ServiceEndpoint:ServiceEndpointType = 'http://localhost:3001';
export const ServiceResources:ServiceResourcesType = {
    login: `${ServiceEndpoint}/auth`,
    users: `${ServiceEndpoint}/users`,
    user: `${ServiceEndpoint}/user`
};
