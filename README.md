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
위 프로젝트는 날씨 데이터를 제공해주는 api가 하루에 100,000건으로 호출이 제한되어있기 때문에 필요한 프로젝트라고 생각하여 진행했습니다.
## Auth
기본적인 백엔트 프로젝트에 모두 요구되는 기능이었습니다. 로그인 회원가입 미들웨어인증 등 백엔드에 필요한 인증기능을 구현했습니다.
1. pw를 암호화하기 위해 bcrypt를 사용했습니다.
2. jwt를 이용해 로그인한 사용자의 토큰을 헤더에 감싸 클라이언트에 보내줍니다.
3. jwt를 부여받은 사용자는 jwt를 이용하여 Calendar api를 호출하며 jwt가 없는 클라이언트는 Calendar api를 호출할 수 없습니다.
## Calendar
이 프로젝트를 진행하고 어떤 프로젝트든 완성할 수 있겠다는 자신감을 가졌습니다. 회원가입 한 사용자에게 랜덤의 색이 부여되는데 user테이블에 있는 이 색은 event테이블에 join되어 각 이벤트가 어떤 사용자의 것인지 클라이언트에서 쉽게 판단할 수 있도록 도와줍니다. 이 기능은 구글캘린더의 기능을 본따 만들었습니다.
뿐만 아니라 클라이언트에서 사용자가 선택한 이벤트에 대해 D-day를 계산할 수 있도록 선택한 이벤트의 idx와 선택한 이벤트의 eventTime을 클라이언트에 보내줍니다.
## 리팩토링
Holiday, MyFriends, Weather프로젝트를 하면서 clean code의 중요성을 알지 못했지만 Calendar프로젝트를 하며 clean code의 중요성을 깨달았습니다. 내가 적은 코드지만 내가 이해하기 힘든 상황이 여러번있었고 지체하지 않아도 될 시간을 지체하여 프로젝트 개발기간이 길어졌습니다. 리팩토링을 마친 후 새프로젝트를 진행합니다.
2021-05-04 시작

[gitfront]: https://github.com/jdy0120/gitfront