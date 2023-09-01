## ✅ 체크리스트 어플
### ✅ 프로젝트 기획 이유
노마드코더 강의를 들으면서 제작 이후 추가 기능 구현하였습니다. react native를 공부하기 위해 강의를 들으면서 프로젝트를 진행하게 되었습니다. 준비물을 적어놓을 수 있고, 일정 정리를 도와주는 체크리스트 앱을 애용하기 때문에 정말 필요한 기능들을 생각해오고 있어 이후에 이를 반영하여 업데이트 예정입니다.

----------------------------------------------------------
### ✅ 기능 설명
1. 체크리스트 Work, Travel 두 페이지  
   Work, Travel 두 페이지로 구성해 Work 버튼을 누르면 할 일, Travel 버튼을 누르면 준비물을 업로드할 수 있게 제작
   
   <img src="https://github.com/soeun2537/checklist_app/assets/83596813/0c8c015a-99ed-48d6-9e49-47ef5eb8907e.png" width="200" height="400"/>
   <img src="https://github.com/soeun2537/checklist_app/assets/83596813/12c3b95a-dc09-4f78-b588-862f448f2143.png" width="200" height="400"/>
2. Add 기능  
   체크리스트를 추가할 수 있는 기능, 상단에 TextInput으로 사용자에게 값을 받음  
3. Delete 기능  
   체크리스트를 삭제할 수 있는 기능, alert로 구현
   
   <img src="https://github.com/soeun2537/checklist_app/assets/83596813/7910cbc3-8349-454c-b63d-0f6782a9ae9a.png" width="200" height="400"/>
4. 체크리스트 완료 표시, 완료 해제 가능  
   각 목록 가장 왼쪽에 네모 버튼을 누르면 완료되었다는 표시를 보여줌, 한 번 더 누르면 완료 해제
5. 체크리스트 및 페이지 종료 시점 저장  
   AsyncStorage를 이용하여 사용자가 업로드한 체크리스트와 페이지 종료 시점(Travel에서 종료했을 시 load 했을 때 Travel 페이지에서 시작)을 저장해 놓고, 앱 실행 시 load 하여 보여줌
