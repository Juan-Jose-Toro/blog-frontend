# React Custom Hooks
[React docs: Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Key concepts
- Functions that return state by using `useState` and `useEffect`
- Hook names start with **use**.
- There should be one `useEffect` for each independent functionality we want to add
## Syntax

**Import** a hook with:
```
import { useOnlineStatus } from './useOnlineStatus.js';
```
The Following is an example of a custom hook

```
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```
