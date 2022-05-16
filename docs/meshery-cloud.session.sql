-- select * from public.performance_profiles
-- where user_id = 'de7f1b67-5c6d-4c38-8c6c-fda919129ed0' and service_mesh='ISTIO'
-- order by created_at DESC LIMIT 10;

select runner_results, name, mesh from public.meshery_results
where user_id = 'de7f1b67-5c6d-4c38-8c6c-fda919129ed0' and mesh='LINKERD'
Order by created_at DESC
LIMIT 10;

-- where performance_profile='afa88461-b6b9-461d-a78b-6c1d08a7ebdf'


-- DESC public.performance_profiles;
-- SHOW COLUMNS FROM public.performance_profiles;

-- SELECT * from public.performance_profiles where false;
