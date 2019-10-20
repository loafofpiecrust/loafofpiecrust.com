
import { globalHistory } from "@reach/router"
import { useSubscription } from "use-subscription"
import { useMemo } from "react"

export const useLocation = () => useSubscription(
  useMemo(
    () => ({
      getCurrentValue: () => globalHistory.location,
      subscribe: (callback) => globalHistory.listen(callback),
    }),
    []
  )
)
