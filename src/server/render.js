import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext  } from 'react-router';
import { Provider } from 'react-redux';

export default (store, renderProps)=>{
	return renderToString(
		<Provider store={store}>
			<RoutingContext {...renderProps} />
		</Provider>
	)
}
