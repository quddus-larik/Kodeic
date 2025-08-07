// /dashboard/[username]/repos
import { CoreUI } from "@/layouts/core-ui"
import {
    Table,
    TableBody,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter
} from '@/components/ui/table'
function Page (){

    return (
        <CoreUI>
            <div className="p-3">
                <h1>Hello Repos</h1>
            </div>
        </CoreUI>
    )
}
export default Page;