gitback : typescript를 이용하여 자유롭게 백엔드를 공부할 수 있는 공간입니다.
=

#### 이 프로젝트는 [gitfront]를 프론트엔드로 두고 백엔드 작업을 진행합니다.<br/>api 호출과 응답에 목적을 두고 있으며 휴일,데이터베이스에 저장된 친구정보, 지역 기상정보를 응답해줍니다.
   
#### firebase 배포 이유 : gitfront를 github-page로 호스팅했습니다. [호스팅된 페이지](https://jdy0120.github.io/gitfront)는 https이고 휴일,날씨정보를 제공하는 api는 http였기 때문에 https -> http호출이 불가능한 문제가 있었습니다.<br/>하지만  firebase에 배포된 서버는 https이기 때문에 https -> https호출이 가능했고 gitfront -> gitback -> api server 방향으로 호출하면 문제를 해결할 수 있다고 생각하여 firebase에 배포했습니다.

<hr/>

## Holiday

## MyFriends

## Weather


[gitfront]: https://github.com/jdy0120/gitfront