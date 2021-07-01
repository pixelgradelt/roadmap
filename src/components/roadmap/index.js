import './style.css';
import tracks from './tasks';

const Roadmap = ( props ) => {
	return (
		<div className="roadmap">
			{ tracks.map( track => {
				return <Track { ...track } />
			} ) }
		</div>
	)
}

const Track = ( props ) => {

	const {
		tasks
	} = props;

	return (
		<div className="track">
			{ tasks.map( task => {
				return <Task { ...task } />
			} ) }
		</div>
	)
}

const getCompletion = ( task ) => {
	const { tracks, completed } = task;

	if ( !!completed ) {
		return completed
	}

	if ( !tracks ) {
		return 0;
	}

	return tracks.reduce( ( acc, track ) => {
		return acc + getTrackCompletion( track );
	}, 0 ) / tracks.length;
}

const getTrackCompletion = ( track ) => {
	const { tasks } = track;

	if ( !Array.isArray( tasks ) ) {
		return 0;
	}

	return tasks.reduce( ( acc, task ) => {
		return acc + getCompletion( task );
	}, 0 ) / tasks.length;
}

const Task = ( task ) => {

	const {
		title,
		description,
		tracks,
	} = task;

	const length = task.length || 10;

	const completion = getCompletion( task );

	const wrapStyle = {
		'flex-grow': `${ length }`,
		'flex-basis': `calc( ${ length } * var(--u) )`,
//		'margin-left': `calc( -1 * ${ completed } * var(--u) )`
	};

	const fillStyle = {
		width: `${ completion * 100 }%`,
	};

	return (
		<div className="task" style={ wrapStyle }>
			<div className="task__fill" style={ fillStyle }></div>
			{ ( title || description ) && <div className="task__text">
				{ title && <div className="task__title">{ title }</div> }
				{ description && <div className="task__description">{ description }</div> }
			</div> }
			{ tracks && <div className="task__subtasks">
				{ tracks.map( track => {
					return <Track { ...track } />
				} ) }
			</div> }
		</div>
	)
}

export default Roadmap;
