"use client"
import './dashboard.css';
import { useEffect, useState } from "react";
import EventForm from "../../component/eventDashboard/EventForm";
import { useEventContext } from "../../context/EventContext";
import EventCard from "../../component/eventDashboard/EventCard";
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPanel from '../../component/eventDashboard/FilterPanel';
import { useFilterContext } from '../../context/filterContext';
import { EventData, EventFormValues } from '../../types/eventType';
import { useAuth } from '../../context/authContext';

const Dashboard = ()=>{
    const [showEventForm,setShowEventForm]= useState({show:false,data:{},type:''});
    const [showFilter,setShowFilter] = useState(false);
    const [sort,setSort] = useState('startDateTime');
    const {addEvent,events,deleteEvent,updateEvent} = useEventContext();
    const { type, category, start, end, setFilterParam, clearFilters } = useFilterContext();
    const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search')?.toLowerCase() || ''; 
  const {user,loading} = useAuth();
  const navigate = useRouter();

  // filtered data based on search, sort and filters
  const filtered = events
    .filter((e) =>
      e.title.toLowerCase().includes(searchQuery) ||
      e.description.toLowerCase().includes(searchQuery)
    )
    .filter((e) => (type ? e.eventType === type : true))
    .filter((e) => (category ? e.category === category : true))
    .filter((e) => {
      if (start && new Date(e.startDateTime) < new Date(start)) return false;
      if (end && new Date(e.endDateTime) > new Date(end)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'category') return a.category.localeCompare(b.category);
      return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
    });

    useEffect(() => {
        // validating user
        if (!user && !loading) {
          navigate.replace('/login');
        }
      }, [user, loading]);
      
      
   
    return <>
        <div className='filter-container'>
        <input
          type="text"
          placeholder="Search events..."
          defaultValue={searchQuery}
          onChange={(e) => setFilterParam('search', e.target.value)}
        />
        <div className='filter-items'>
        <button type='button' onClick={()=>setShowEventForm({show:true,data:{},type:'add'})}>Add Event</button>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="startDateTime">Sort by Start Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <button type='button' onClick={()=>setShowFilter(true)}>Filter</button>
        </div>



      </div>
        {showEventForm.show &&
        <EventForm
            defaultValues={showEventForm.data ?? undefined}
            onCancel={()=>setShowEventForm({show:false,data:{},type:''})} 
            onSubmit={(data: EventFormValues)=>{
                console.log(data)
                showEventForm.type==='add'? addEvent(data): updateEvent((showEventForm.data as EventData).id ?? '',data);
                setShowEventForm({show:false,data:{},type:''})
            }}/> 
        }
        <div className="event-container">
        {
            filtered?.map(item=>{
                return <EventCard
                key={item.id}
                event={item}
                onDelete={(id)=>{deleteEvent(id)}}
                onEdit={()=>{ setShowEventForm({show:true,data:item,type:'edit'})}}
                />
            })
        }
        </div>
        {showFilter && 
         <FilterPanel
         filterType={type}
         filterCategory={category}
         startDate={start}
         endDate={end}
         updateQueryParam={setFilterParam}
         clearAllQueryParams={clearFilters}
         onClose={() => setShowFilter(false)}
       />}
       
    </>
}
export default Dashboard;
