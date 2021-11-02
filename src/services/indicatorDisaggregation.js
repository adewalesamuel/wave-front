import { erase, post} from './api';

const  ENPOINTS = {
    INDICATOR_DISAGGREGATION: 'indicator_disaggregations',
};

const create = (payload, signal) => {
    return post(ENPOINTS.INDICATOR_DISAGGREGATION, payload, signal)
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.INDICATOR_DISAGGREGATION}/${id}`, signal)
}

export const IndicatorDisaggregation = {
    create,
    destroy
}