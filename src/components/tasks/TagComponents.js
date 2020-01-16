import React, {Fragment} from 'react';

export const TagList = ({tags}) => <Fragment>
    {tags !== null ?
        tags.map((tag, idx) => (
            <Tag key={idx} tag={tag}/>
        )) :
        <span><small className='text-muted'>No tags exist</small></span>
    }
</Fragment>;

const Tag = ({tag}) => <Fragment>
    <span className='mr-2'>
        <small className='border border-dark text-muted p-1 rounded'>{tag}</small>
    </span>
</Fragment>;