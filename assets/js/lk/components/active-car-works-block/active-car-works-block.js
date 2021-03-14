import React, { useState } from 'react';

import Works from './Works';
import {useQuery} from '@apollo/client';
import {GET_ACTIVE_CAR_ID, GET_WORKS_BY_CAR_ID} from '../../gql/queries';
import {ErrorIndicator, Loading} from '../server-indicators';

function ActiveCarWorksBlock() {

  let works = [];
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {data:{activeCarId}} = useQuery(GET_ACTIVE_CAR_ID)
  const {data, loading, error, fetchMore} = useQuery(GET_WORKS_BY_CAR_ID, {
    variables: {
      carId: activeCarId,
      after: "0",
    }
  })

  if (data) {
    works = data.works.edges.map(work => work.node)
  }

  const onFetchMore = () => {
    if (data.works.pageInfo.hasNextPage && !isFetchingMore) {
      setIsFetchingMore(true)
      fetchMore({ variables: {
          after: data.works.pageInfo.endCursor,
        }})
      .then(()=> setIsFetchingMore(false))
    }
  }

  return (
      <section className="garage__block garage__works">
        <h2 className="garage__title">История ремонта и обслуживания</h2>
        { loading && <Loading/> }
        { error && <ErrorIndicator/> }
        { data?.works && <Works works={works}/> }
        { data?.works.pageInfo.hasNextPage &&
          <button className="btn garage__join-btn" onClick={ onFetchMore }>
            { isFetchingMore ? "Загрузка" : "Показать ещё" }
          </button>
        }
      </section>
    )
}

export default ActiveCarWorksBlock;
