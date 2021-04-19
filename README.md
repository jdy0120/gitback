gitback : typescript를 이용하여 자유롭게 백엔드를 공부할 수 있는 공간입니다.
=

#### 이 프로젝트는 [gitfront]를 프론트엔드로 두고 백엔드 작업을 진행합니다.<br/>api 호출과 응답에 목적을 두고 있으며 휴일,데이터베이스에 저장된 친구정보, 지역 기상정보를 응답해줍니다.
   
#### firebase 배포 이유 : gitfront를 github-page로 호스팅했습니다. [호스팅된 페이지](https://jdy0120.github.io/gitfront)는 https이고 휴일,날씨정보를 제공하는 api는 http였기 때문에 https -> http호출이 불가능한 문제가 있었습니다.<br/>하지만  firebase에 배포된 서버는 https이기 때문에 https -> https호출이 가능했고 gitfront -> gitback -> api server 방향으로 호출하면 문제를 해결할 수 있다고 생각하여 firebase에 배포했습니다.

<hr/>

## Holiday
api개발을 공부하기 위한 프로젝트입니다. gitback을 만들고 처음 시작한 프로젝트이며 이 프로젝트를 시작한 이유는 firebase배포를 한 후 호스팅된 프론트엔드에 api를 제공해주기 위해서입니다.
앞서 말했듯이 https -> http방향으로 api 호출이 안되기 때문에 Holiday 프로젝트로 https(front) -> https(back) -> http(공공데이터)를 구현하고 공부했습니다.
## MyFriends
Cloud SQL과 api를 공부하기 위한 프로젝트입니다. 프론트엔드에서 지역적으로 데이터를 저장하는 것이 아닌 Cloud SQL을 이용해 전역적으로 데이터를 저장하고 수정하고 삭제할 수 있는 CRUD를 공부했습니다.
## Weather
앞 두 프로젝트보다 구현능력을 요구하는 프로젝트였습니다. 날씨 데이터를 제공하는 api를 이용해 클라이언트에게 날씨데이터를 제공하며 곧바로 Cloud SQL에 저장합니다. 클라이언트가 같은 지역의 날씨를 5분이내로 다시 호출할 경우 데이터베이스에 있는 날씨데이터를 제공해줍니다.
위 프로젝트는 날씨 데이터를 제공해주는 api가 하루에 100000건으로 호출이 제한되어있기 때문에 필요한 프로젝트라고 생각하여 진행했습니다.

[gitfront]: https://github.com/jdy0120/gitfront