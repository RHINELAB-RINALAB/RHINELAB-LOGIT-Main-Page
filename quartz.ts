import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins";
import { External } from "./.quartz/components";

//Correct the compilation scope by targeting the local internal plugin cache
//import * as ExternalPlugin from "./quartz/plugins"


//import * as Component from "./quartz/components"
// Explicit dictionary tracking your custom structural sorting sequence
const folderOrderRecord: Record<string, number> = {
  "General": 1,
  "Philosophy and Institutional Baseline": 2,
  "Guideline": 3,
  "Laboratory": 4,
  "Logistics": 5,
  "Documents": 6,
  "Members": 7,
}

ExternalPlugin.Explorer({
  title: "Navigation system",
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
  sortFn: (a, b) => {
    // Execute priority checks when both intersecting nodes are directories
    if (a.isFolder && b.isFolder) {
      const weightA = folderOrderRecord[a.displayName.toLowerCase()] ?? 999
      const weightB = folderOrderRecord[b.displayName.toLowerCase()] ?? 999
      
      if (weightA !== weightB) {
        return weightA - weightB
      }
      return a.displayName.localeCompare(b.displayName)
    }

    // Maintain native sorting paradigms by enforcing folders-first rules over files
    if (a.isFolder && !b.isFolder) return -1
    if (!a.isFolder && b.isFolder) return 1

    // Default to natural alphanumeric evaluations for flat file trees
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
});


// Ending
const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()