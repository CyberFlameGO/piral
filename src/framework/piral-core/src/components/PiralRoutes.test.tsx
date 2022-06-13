import * as React from 'react';
import * as hooks from '../hooks';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import { PiralRoutes } from './PiralRoutes';
import { DefaultRouteSwitch } from '../defaults/DefaultRouteSwitch_v5';

const mountWithRouter = (node, url = '/') =>
  mount(
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      {node}
    </MemoryRouter>,
  );

jest.mock('../hooks');

(hooks as any).useRoutes = () => [
  {
    path: '/',
    Component: StubHome,
  },
  {
    path: '/custom',
    Component: StubCustomPage,
  },
  {
    path: '/foo',
    Component: StubFooPage,
  },
  {
    path: '/foo/bar',
    Component: StubFooBarPage,
  },
  {
    path: '/bar',
    Component: StubBarPage,
  },
];

const StubHome: React.FC = (props) => <div />;
StubHome.displayName = 'StubHome';

const StubCustomPage: React.FC = (props) => <div />;
StubCustomPage.displayName = 'StubCustomPage';

const StubNotFound: React.FC = (props) => <div />;
StubNotFound.displayName = 'StubNotFound';

const StubComponent: React.FC<{ data: any }> = (props) => <div />;
StubComponent.displayName = 'StubComponent';

const StubFooPage: React.FC<{ data: any }> = (props) => <div />;
StubFooPage.displayName = 'StubFooPage';

const StubFooBarPage: React.FC<{ data: any }> = (props) => <div />;
StubFooBarPage.displayName = 'StubFooBarPage';

const StubBarPage: React.FC<{ data: any }> = (props) => <div />;
StubBarPage.displayName = 'StubBarPage';

describe('Routes Module', () => {
  it('always goes to the given home on "/"', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/');
    expect(node.find(StubHome).length).toBe(1);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes to the not found on an invalid path', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/qxz');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(1);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes to the custom page on "/custom"', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/custom');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(1);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes exactly to the page on "/foo/bar"', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/foo/bar');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(1);
  });

  it('goes exactly to the page on "/foo"', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/foo');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
    expect(node.find(StubFooPage).length).toBe(1);
  });

  it('goes exactly to the page on "/bar"', () => {
    const node = mountWithRouter(<PiralRoutes NotFound={StubNotFound} RouteSwitch={DefaultRouteSwitch} />, '/bar');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
    expect(node.find(StubBarPage).length).toBe(1);
  });
});
