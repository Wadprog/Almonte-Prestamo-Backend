import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const Instruction = ({ docs, loading }) => {
	const { Fragment } = React;
	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
					{docs && docs != null && docs.length > 0 ? (
						<ul className="list-group mt-4">
							<h1 className="text-white"> Como usar el sistema </h1>

							{docs.map(doc => (
								<li className="list-group-item">
									<h3>{doc.title}</h3>
									<p>{doc.text}</p>
								</li>
							))}
						</ul>
					) : (
						<h1 className="text-white">No instrucciones</h1>
					)}
				</Fragment>
			)}
		</div>
	);
};

Instruction.prototype = {
	loading: PropTypes.bool.isRequired,
	docs: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	loading: state.doc.loading,
	docs: state.doc.docs
});
export default connect(mapStateToProps, {})(Instruction);
