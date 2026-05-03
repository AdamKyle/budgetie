import UseActivityTimeoutParams from 'lib/api-handler/hooks/definitions/use-activity-timeout-params-definitions';

export default interface UseActivityTimeoutDefinitions {
  handleInactivity: (params: UseActivityTimeoutParams) => void;
}
